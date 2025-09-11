export interface BannerData {
    banners: Banner[];
    [key: string]: any
}

export interface Banner {
    targetId: number;
    bigImageUrl: string;
    imageUrl: string;
    targetType: number;
    typeTitle: string;
    s_ctrp: string;
    url: string;
}

//歌单
export interface NewSongsData {
    result: Result[];
    [key: string]: any
}

export interface Result {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime: number;
    playCount: number;
    trackCount: number;
    highQuality: boolean;
    alg: string;
}

//歌曲
export interface SongData {
    result: SongResult[];
    [key: string]: any
}

export interface SongResult {
    id: number;
    type: number;
    name: string;
    copywriter: null;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime: null;
    song: Song;
    alg: string;
}

interface Song {
    name: string;
    id: number;
    position: number;
    alias: any[];
    status: number;
    fee: number;
    copyrightId: number;
    disc: string;
    no: number;
    artists: Artist[];
    album: Album;
    starred: boolean;
    popularity: number;
    score: number;
    starredNum: number;
    duration: number;
    playedNum: number;
    dayPlays: number;
    hearTime: number;
    sqMusic: SqMusic;
    hrMusic: SqMusic | null;
    ringtone: string;
    crbt: null;
    audition: null;
    copyFrom: string;
    commentThreadId: string;
    rtUrl: null;
    ftype: number;
    rtUrls: any[];
    copyright: number;
    transName: null | string;
    sign: null;
    mark: number;
    originCoverType: number;
    originSongSimpleData: OriginSongSimpleDatum | null;
    single: number;
    noCopyrightRcmd: null;
    hMusic: SqMusic;
    mMusic: SqMusic;
    lMusic: SqMusic;
    bMusic: SqMusic;
    mvid: number;
    rtype: number;
    rurl: null;
    mp3Url: null;
    videoInfo: VideoInfo;
    privilege: Privilege;
    transNames?: string[];
    exclusive?: boolean;
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

interface VideoInfo {
    moreThanOne: boolean;
    video: Video | null;
}

interface Video {
    vid: string;
    type: number;
    title: string;
    playTime: number;
    coverUrl: string;
    publishTime: number;
    artists: null;
}

interface OriginSongSimpleDatum {
    songId: number;
    name: string;
    artists: Artist2[];
    albumMeta: Artist2;
}

interface Artist2 {
    id: number;
    name: string;
}

interface SqMusic {
    name: null;
    id: number;
    size: number;
    extension: string;
    sr: number;
    dfsId: number;
    bitrate: number;
    playTime: number;
    volumeDelta: number;
}

interface Album {
    name: string;
    id: number;
    type: string;
    size: number;
    picId: number;
    blurPicUrl: string;
    companyId: number;
    pic: number;
    picUrl: string;
    publishTime: number;
    description: string;
    tags: string;
    company: string;
    briefDesc: string;
    artist: Artist;
    songs: any[];
    alias: any[];
    status: number;
    copyrightId: number;
    commentThreadId: string;
    artists: Artist[];
    subType: string;
    transName: null;
    onSale: boolean;
    mark: number;
    gapless: number;
    picId_str: string;
}

interface Artist {
    name: string;
    id: number;
    picId: number;
    img1v1Id: number;
    briefDesc: string;
    picUrl: string;
    img1v1Url: string;
    albumSize: number;
    alias: any[];
    trans: string;
    musicSize: number;
    topicPerson: number;
}

//mv
export interface MvsData {
    result: MvsResult[];
    [key: string]: any
}

export interface MvsResult {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime: null;
    duration: number;
    playCount: number;
    subed: boolean;
    artists: Artist[];
    artistName: string;
    artistId: number;
    alg: string;
}

interface Artist {
    id: number;
    name: string;
}