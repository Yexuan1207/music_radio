export interface Artists {
    artist: Artist;
    hotSongs: HotSong[];
    more: boolean;
    code: number;
}

interface HotSong {
    rtUrls: any[];
    ar: Ar[];
    al: Al;
    st: number;
    noCopyrightRcmd: null;
    songJumpInfo: null;
    no: number;
    fee: number;
    djId: number;
    mv: number;
    cd: string;
    t: number;
    v: number;
    h: H | null;
    sq: H | null;
    hr: H | null;
    l: H;
    rtUrl: null;
    ftype: number;
    rt: null | string;
    mst: number;
    rtype: number;
    rurl: null;
    pst: number;
    alia: string[];
    pop: number;
    cp: number;
    crbt: null;
    cf: string;
    dt: number;
    a: null;
    m: H;
    name: string;
    id: number;
    privilege: Privilege;
    tns?: string[];
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
    alia?: string[];
}

interface Ar {
    id: number;
    name: string;
    alia?: string[];
}

export interface Artist {
    img1v1Id: number;
    topicPerson: number;
    picId: number;
    musicSize: number;
    albumSize: number;
    briefDesc: string;
    picUrl: string;
    img1v1Url: string;
    followed: boolean;
    trans: string;
    alias: string[];
    name: string;
    id: number;
    publishTime: number;
    accountId: number;
    picId_str: string;
    img1v1Id_str: string;
    mvSize: number;
}