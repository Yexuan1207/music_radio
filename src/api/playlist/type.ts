export interface PlaylistsData {
    playlists: playlist[];
    total: number;
    [key: string]: any
}
export interface TopPlaylistType {
    playlists: playlist;
    [key: string]: any
}

export interface playlist {
    name: string;
    id: number;
    trackNumberUpdateTime: number;
    status: number;
    userId: number;
    createTime: number;
    updateTime: number;
    subscribedCount: number;
    trackCount: number;
    cloudTrackCount: number;
    coverImgUrl: string;
    iconImgUrl: null;
    coverImgId: number;
    description: string;
    tags: string[];
    playCount: number;
    trackUpdateTime: number;
    specialType: number;
    totalDuration: number;
    creator: Creator;
    tracks: null;
    subscribers: Subscriber[];
    subscribed: null;
    commentThreadId: string;
    newImported: boolean;
    adType: number;
    highQuality: boolean;
    privacy: number;
    ordered: boolean;
    anonimous: boolean;
    coverStatus: number;
    recommendInfo: null;
    socialPlaylistCover: null;
    recommendText: null;
    coverText: null;
    relateResType: null;
    relateResId: null;
    tsSongCount: number;
    algType: null;
    playlistType: string;
    shareCount: number;
    coverImgId_str: string;
    alg: string;
    commentCount: number;
}

interface Subscriber {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags: null;
    experts: null;
    djStatus: number;
    vipType: number;
    remarkName: null;
    authenticationTypes: number;
    avatarDetail: null;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
}

interface Creator {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags: null;
    experts: null;
    djStatus: number;
    vipType: number;
    remarkName: null;
    authenticationTypes: number;
    avatarDetail: AvatarDetail;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
}

interface AvatarDetail {
    userType: number;
    identityLevel: number;
    identityIconUrl: string;
}