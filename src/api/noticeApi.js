import { supabase } from '../services/supabase';

/**
 * Tiptap JSON에서 이미지 URL을 모두 찾습니다.
 */
const extractImageUrls = (content) => {
  const urls = [];

  const walk = (node) => {
    if (!node || typeof node !== 'object') {
      return;
    }

    if (node.type === 'image' && node.attrs?.src) {
      urls.push(node.attrs.src);
    }

    if (Array.isArray(node.content)) {
      node.content.forEach(walk);
    }
  };

  // DB에서 문자열로 넘어오는 경우 처리
  let parsedContent = content;

  if (typeof content === 'string') {
    try {
      parsedContent = JSON.parse(content);
    } catch {
      return [];
    }
  }

  walk(parsedContent);

  return urls;
};

/**
 * Supabase Storage Public URL에서
 * 실제 Storage 파일 경로(editor/xxx.jpg)를 가져옵니다.
 *
 * 예:
 * https://xxxxx.supabase.co/storage/v1/object/public/editor-images/editor/abc.jpg
 *
 * → editor/abc.jpg
 */
const getStoragePathFromUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const marker = '/storage/v1/object/public/editor-images/';
  const index = url.indexOf(marker);

  if (index === -1) {
    return null;
  }

  const path = url.slice(index + marker.length);

  return decodeURIComponent(path);
};

/**
 * 수정 전에는 있었지만
 * 수정 후에는 더 이상 사용하지 않는 이미지를 삭제합니다.
 */
const deleteUnusedImages = async (oldContent, newContent) => {
  const oldUrls = extractImageUrls(oldContent);
  const newUrls = extractImageUrls(newContent);

  const unusedUrls = oldUrls.filter((url) => !newUrls.includes(url));

  const paths = unusedUrls.map(getStoragePathFromUrl).filter(Boolean);

  if (paths.length === 0) {
    return;
  }

  const { error } = await supabase.storage.from('editor-images').remove(paths);

  if (error) {
    console.error('Storage 이미지 삭제 실패:', error);
  }
};

/**
 * 게시글 목록 조회
 */
export const getNoticeList = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      profile:profiles (
        nickname,
        profile_image
      )
    `,
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('게시글 조회 실패', error);
    return [];
  }

  return data;
};

/**
 * 게시글 생성
 */
export const createNoticeApi = async (notice, userId) => {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: notice.title,
      content: notice.content,
      views: 0,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * 게시글 수정
 *
 * 수정 전 content와 수정 후 content를 비교해서
 * 더 이상 사용하지 않는 Storage 이미지를 삭제합니다.
 */
export const updateNoticeApi = async (id, notice) => {
  // 수정 전 게시글 가져오기
  const { data: oldPost, error: oldPostError } = await supabase.from('posts').select('content').eq('id', id).single();

  if (oldPostError) {
    throw oldPostError;
  }

  // 게시글 업데이트
  const { data, error } = await supabase
    .from('posts')
    .update({
      category: notice.category,
      title: notice.title,
      content: notice.content,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  // 수정 후 사용하지 않는 이미지 삭제
  await deleteUnusedImages(oldPost.content, notice.content);

  return data;
};

/**
 * 게시글 삭제
 *
 * 게시글에 사용 중이던 이미지도 Storage에서 삭제합니다.
 */
export const deleteNoticeApi = async (id) => {
  // 삭제할 게시글의 content 가져오기
  const { data: post, error: postError } = await supabase.from('posts').select('content').eq('id', id).single();

  if (postError) {
    throw postError;
  }

  // 게시글 삭제
  const { data, error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    throw error;
  }

  // 게시글에 포함되어 있던 이미지 찾기
  const imageUrls = extractImageUrls(post.content);

  const paths = imageUrls.map(getStoragePathFromUrl).filter(Boolean);

  // Storage 이미지 삭제
  if (paths.length > 0) {
    const { error: storageError } = await supabase.storage.from('editor-images').remove(paths);

    if (storageError) {
      console.error('게시글 이미지 Storage 삭제 실패:', storageError);
    }
  }

  return data;
};

/**
 * 조회수 증가
 */
export const increaseViewApi = async (id) => {
  const { data, error } = await supabase.rpc('increase_post_views', {
    post_id: id,
  });

  if (error) {
    throw error;
  }

  return data;
};
