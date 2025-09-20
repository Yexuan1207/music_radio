export interface SongDetail {
    songs: Song[];
    privileges: Privilege[];
    code: number;
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
    cannotListenReason: null | number;
    playReason: null;
    freeLimitTagType: null;
}

interface Song {
    name: string;
    mainTitle: null | string;
    additionalTitle: null | string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia: string[];
    pop: number;
    st: number;
    rt: null | string;
    fee: number;
    v: number;
    crbt: null;
    cf: string;
    al: Al;
    dt: number;
    h: H;
    m: H;
    l: H | null;
    sq: H | null;
    hr: H | null;
    a: null;
    cd: string;
    no: number;
    rtUrl: null;
    ftype: number;
    rtUrls: any[];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    originCoverType: number;
    originSongSimpleData: OriginSongSimpleDatum | null;
    tagPicList: null;
    resourceState: boolean;
    version: number;
    songJumpInfo: null;
    entertainmentTags: null;
    awardTags: null;
    displayTags: null;
    single: number;
    noCopyrightRcmd: NoCopyrightRcmd | null;
    mv: number;
    rtype: number;
    rurl: null;
    mst: number;
    cp: number;
    publishTime: number;
    tns?: string[];
}

interface NoCopyrightRcmd {
    type: number;
    typeDesc: string;
    songId: null;
    thirdPartySong: null;
    expInfo: null;
}

interface OriginSongSimpleDatum {
    songId: number;
    name: string;
    artists: Artist[];
    albumMeta: Artist;
}

interface Artist {
    id: number;
    name: string;
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
    picUrl: string;
    tns: string[];
    pic_str?: string;
    pic: number;
}

interface Ar {
    id: number;
    name: string;
    tns: any[];
    alias: any[];
}

//***********       歌词            ***************** */
export interface lyricType {
    sgc: boolean;
    sfy: boolean;
    qfy: boolean;
    lrc: Lrc;
    klyric: Lrc;
    tlyric: Lrc;
    romalrc: Lrc;
    code: number;
    [key: string]: any;
}

export interface Lrc {
    version: number;
    lyric: string;
}