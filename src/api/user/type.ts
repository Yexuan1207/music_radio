export interface UserDetail {
    profile: Profile;
    [key: string]: any
}

export interface Profile {
    privacyItemUnlimit: PrivacyItemUnlimit;
    avatarDetail: null;
    backgroundImgId: number;
    backgroundUrl: string;
    userType: number;
    defaultAvatar: boolean;
    avatarUrl: string;
    vipType: number;
    accountStatus: number;
    remarkName: null;
    followed: boolean;
    mutual: boolean;
    detailDescription: string;
    djStatus: number;
    avatarImgId: number;
    province: number;
    city: number;
    birthday: number;
    gender: number;
    nickname: string;
    authStatus: number;
    expertTags: null;
    experts: Experts;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    description: string;
    createTime: number;
    userId: number;
    signature: string;
    authority: number;
    followeds: number;
    follows: number;
    blacklist: boolean;
    eventCount: number;
    allSubscribedCount: number;
    playlistBeSubscribedCount: number;
    followTime: null;
    followMe: boolean;
    artistIdentity: any[];
    cCount: number;
    inBlacklist: boolean;
    sDJPCount: number;
    playlistCount: number;
    sCount: number;
    newFollows: number;
}

interface Experts {
}

interface PrivacyItemUnlimit {
    area: boolean;
    college: boolean;
    user_page_profile: boolean;
    gender: boolean;
    age: boolean;
    villageAge: boolean;
}

export interface userPlaylist {
    playlist: Playlist[];
    [key: string]: any
}

export interface Playlist {
    subscribers: any[];
    subscribed: null;
    creator: Creator;
    artists: null;
    tracks: null;
    top: boolean;
    updateFrequency: null;
    backgroundCoverId: number;
    backgroundCoverUrl: null;
    titleImage: number;
    titleImageUrl: null;
    englishTitle: null;
    opRecommend: boolean;
    recommendInfo: null;
    subscribedCount: number;
    cloudTrackCount: number;
    userId: number;
    totalDuration: number;
    coverImgId: number;
    privacy: number;
    trackUpdateTime: number;
    trackCount: number;
    updateTime: number;
    commentThreadId: string;
    coverImgUrl: string;
    specialType: number;
    anonimous: boolean;
    createTime: number;
    highQuality: boolean;
    newImported: boolean;
    trackNumberUpdateTime: number;
    playCount: number;
    adType: number;
    description: null | string;
    tags: string[];
    ordered: boolean;
    status: number;
    name: string;
    id: number;
    coverImgId_str: null | string;
    sharedUsers: null;
    shareStatus: null;
    copied: boolean;
    containsTracks: boolean;
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
    avatarDetail: null;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    anchor: boolean;
    avatarImgId_str?: string;
}