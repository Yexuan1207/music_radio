export interface AlbumResponse {
    resourceState: boolean;
    songs: Song[];
    code: number;
    album: Album;
}

interface Album {
    songs: any[];
    paid: boolean;
    onSale: boolean;
    mark: number;
    awardTags: null;
    displayTags: null;
    picUrl: string;
    artists: Artist[];
    picId: number;
    artist: Artist2;
    copyrightId: number;
    briefDesc: string;
    publishTime: number;
    company: string;
    commentThreadId: string;
    blurPicUrl: string;
    companyId: number;
    pic: number;
    status: number;
    subType: string;
    alias: any[];
    description: string;
    tags: string;
    name: string;
    id: number;
    type: string;
    size: number;
    picId_str: string;
    info: Info;
}

interface Info {
    commentThread: CommentThread;
    latestLikedUsers: null;
    liked: boolean;
    comments: null;
    resourceType: number;
    resourceId: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    threadId: string;
}

interface CommentThread {
    id: string;
    resourceInfo: ResourceInfo;
    resourceType: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    hotCount: number;
    latestLikedUsers: null;
    resourceId: number;
    resourceOwnerId: number;
    resourceTitle: string;
}

interface ResourceInfo {
    id: number;
    userId: number;
    name: string;
    imgUrl: string;
    creator: null;
    encodedId: null;
    subTitle: null;
    webUrl: null;
}

interface Artist2 {
    img1v1Id: number;
    topicPerson: number;
    picUrl: string;
    picId: number;
    briefDesc: string;
    musicSize: number;
    albumSize: number;
    img1v1Url: string;
    followed: boolean;
    trans: string;
    alias: string[];
    name: string;
    id: number;
    picId_str: string;
    img1v1Id_str: string;
}

interface Artist {
    img1v1Id: number;
    topicPerson: number;
    picUrl: string;
    picId: number;
    briefDesc: string;
    musicSize: number;
    albumSize: number;
    img1v1Url: string;
    followed: boolean;
    trans: string;
    alias: any[];
    name: string;
    id: number;
    img1v1Id_str: string;
}

interface Song {
    rtUrls: any[];
    ar: Ar[];
    al: Al;
    st: number;
    noCopyrightRcmd: null;
    songJumpInfo: null;
    djId: number;
    no: number;
    fee: number;
    mv: number;
    cd: string;
    t: number;
    v: number;
    cp: number;
    crbt: null;
    cf: string;
    dt: number;
    h: H;
    sq: H;
    hr: null;
    l: H;
    rtUrl: null;
    ftype: number;
    rtype: number;
    rurl: null;
    pst: number;
    alia: any[];
    pop: number;
    rt: string;
    mst: number;
    a: null;
    m: H;
    name: string;
    id: number;
    privilege: Privilege;
}

interface Privilege {
    id: number;
    fee: number;
    payed: number;
    st: number;
    pl: number;
    dl: number;
    sp: number;
    cp: number;
    subp: number;
    cs: boolean;
    maxbr: number;
    fl: number;
    toast: boolean;
    flag: number;
    preSell: boolean;
    playMaxbr: number;
    downloadMaxbr: number;
    maxBrLevel: string;
    playMaxBrLevel: string;
    downloadMaxBrLevel: string;
    plLevel: string;
    dlLevel: string;
    flLevel: string;
    rscl: null;
    freeTrialPrivilege: FreeTrialPrivilege;
    rightSource: number;
    chargeInfoList: ChargeInfoList[];
    code: number;
    message: null;
    plLevels: null;
    dlLevels: null;
    ignoreCache: null;
    bd: null;
}

interface ChargeInfoList {
    rate: number;
    chargeUrl: null;
    chargeMessage: null;
    chargeType: number;
}

interface FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    listenType: null;
    cannotListenReason: null;
    playReason: null;
    freeLimitTagType: null;
}

interface H {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
}

interface Al {
    id: number;
    name: string;
    pic_str: string;
    pic: number;
}

interface Ar {
    id: number;
    name: string;
    alia: string[];
}