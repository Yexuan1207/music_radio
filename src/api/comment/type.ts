export interface commentType {
    isMusician: boolean;
    userId: number;
    topComments: any[];
    moreHot: boolean;
    hotComments: HotComment[];
    commentBanner: null;
    code: number;
    comments: Comment[];
    total: number;
    more: boolean;
    [key: string]: any;
}
export interface hotCommentType {
    hotComments: HotComment[]
    [key: string]: any;
}


export interface Comment {  
    user: User2;
    beReplied: (BeReplied | BeReplied2)[];
    pendantData: PendantDatum | null;
    showFloorComment: ShowFloorComment;
    status: number;
    commentId: number;
    content: string;
    richContent: null;
    contentResource: null;
    time: number;
    timeStr: string;
    needDisplayTime: boolean;
    likedCount: number;
    expressionUrl: null;
    commentLocationType: number;
    parentCommentId: number;
    decoration: LikeAnimationMap | Decoration | null;
    repliedMark: null;
    grade: null;
    userBizLevels: null;
    ipLocation: IpLocation2;
    owner: boolean;
    medal: null;
    likeAnimationMap: LikeAnimationMap;
    liked: boolean;
}

interface IpLocation2 {
    ip: null;
    location: string;
    userId: null | number;
}

interface PendantDatum {
    id: number;
    imageUrl: string;
}

interface BeReplied2 {
    user: User3;
    beRepliedCommentId: number;
    content: string;
    richContent: null;
    status: number;
    expressionUrl: null;
    ipLocation: IpLocation;
}

interface BeReplied {
    user: User3;
    beRepliedCommentId: number;
    content: null;
    richContent: null;
    status: number;
    expressionUrl: null;
    ipLocation: IpLocation;
}

interface User3 {
    locationInfo: null;
    liveInfo: null;
    anonym: number;
    highlight: boolean;
    avatarUrl: string;
    avatarDetail: null;
    userType: number;
    followed: boolean;
    mutual: boolean;
    remarkName: null;
    socialUserId: null;
    vipRights: null;
    nickname: string;
    authStatus: number;
    expertTags: null;
    experts: null;
    vipType: number;
    commonIdentity: null;
    userId: number;
    target: null;
}

interface User2 {
    locationInfo: null;
    liveInfo: null;
    anonym: number;
    highlight: boolean;
    avatarUrl: string;
    avatarDetail: AvatarDetail | null;
    userType: number;
    followed: boolean;
    mutual: boolean;
    remarkName: null;
    socialUserId: null;
    vipRights: VipRight | VipRights2 | null;
    nickname: string;
    authStatus: number;
    expertTags: string[] | null;
    experts: null;
    vipType: number;
    commonIdentity: null;
    userId: number;
    target: null;
}

interface VipRights2 {
    associator: Associator;
    musicPackage: Associator;
    redplus: null;
    redVipAnnualCount: number;
    redVipLevel: number;
    relationType: number;
    memberLogo: null;
    extInfo: null;
}

interface Associator {
    vipCode: number;
    rights: boolean;
    iconUrl: string;
}

interface AvatarDetail {
    userType: number;
    identityLevel: number;
    identityIconUrl: string;
}

export interface HotComment {
    user: User;
    beReplied: any[];
    pendantData: null;
    showFloorComment: ShowFloorComment;
    status: number;
    commentId: number;
    content: string;
    richContent: null;
    contentResource: null;
    time: number;
    timeStr: string;
    needDisplayTime: boolean;
    likedCount: number;
    expressionUrl: null;
    commentLocationType: number;
    parentCommentId: number;
    decoration: Decoration | null;
    repliedMark: null;
    grade: null;
    userBizLevels: null;
    ipLocation: IpLocation;
    owner: boolean;
    medal: null;
    likeAnimationMap: LikeAnimationMap;
    liked: boolean;
}

interface LikeAnimationMap {
}

interface IpLocation {
    ip: null;
    location: string;
    userId: null;
}

interface Decoration {
    repliedByAuthorCount: number;
}

interface ShowFloorComment {
    replyCount: number;
    comments: null;
    showReplyCount: boolean;
}

interface User {
    locationInfo: null;
    liveInfo: null;
    anonym: number;
    highlight: boolean;
    avatarUrl: string;
    avatarDetail: null;
    userType: number;
    followed: boolean;
    mutual: boolean;
    remarkName: null;
    socialUserId: null;
    vipRights: VipRight | null;
    nickname: string;
    authStatus: number;
    expertTags: null;
    experts: null;
    vipType: number;
    commonIdentity: null;
    userId: number;
    target: null;
}

interface VipRight {
    associator: null;
    musicPackage: null;
    redplus: null;
    redVipAnnualCount: number;
    redVipLevel: number;
    relationType: number;
    memberLogo: null;
    extInfo: null;
}