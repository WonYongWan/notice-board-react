import { supabase } from '../services/supabase';

export const getNoticeList = async () => {
  const { data, error } = await supabase.from('posts').select(`
    *,
    profile:profiles (
      nickname,
      profile_image
    )
  `);

  if (error) {
    console.error('게시글 조회 실패', error);
    return [];
  }

  return data;
};

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

export const updateNoticeApi = async (id, notice) => {
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

  return data;
};

export const deleteNoticeApi = async (id) => {
  const { data, error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};

export const increaseViewApi = async (id) => {
  const { data, error } = await supabase.rpc('increase_post_views', {
    post_id: id,
  });

  if (error) {
    throw error;
  }

  return data;
};
