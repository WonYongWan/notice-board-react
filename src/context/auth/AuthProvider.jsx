import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { supabase } from '../../services/supabase';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로그인 상태 확인
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // profiles 조회 + Google 프로필 이미지 처리
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

      if (error) {
        console.error('프로필 조회 실패:', error);
        setProfile(null);
        return;
      }

      const defaultProfileImage = 'https://cxqrlgybufxakzmgmkbt.supabase.co/storage/v1/object/public/profile-images/default-profile.png';

      if (data.profile_image !== defaultProfileImage) {
        setProfile(data);
        return;
      }

      // Google 로그인인지 확인
      const provider = user.app_metadata?.provider;
      const avatarUrl = user.user_metadata?.avatar_url;

      if (provider !== 'google' || !avatarUrl) {
        setProfile(data);
        return;
      }

      // Google 이미지를 우리 Storage에 저장
      const { data: avatarData, error: avatarError } = await supabase.functions.invoke('save-google-avatar', {
        body: {
          userId: user.id,
          avatarUrl,
        },
      });

      if (avatarError) {
        console.error('Google 프로필 이미지 저장 실패:', avatarError);

        // 이미지 저장 실패해도 기존 profile은 사용할 수 있도록
        setProfile(data);
        return;
      }

      console.log('Google 프로필 이미지 저장 성공:', avatarData);

      // Storage URL을 포함한 최신 profile을 다시 가져옴
      const { data: updatedProfile, error: updatedProfileError } = await supabase.from('profiles').select('*').eq('id', user.id).single();

      if (updatedProfileError) {
        console.error('업데이트된 프로필 조회 실패:', updatedProfileError);
        setProfile(data);
        return;
      }

      setProfile(updatedProfile);
    };

    fetchProfile();
  }, [user]);

  // 로그아웃
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃 실패:', error);
      return;
    }

    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        setProfile,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
