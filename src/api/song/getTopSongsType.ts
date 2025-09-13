export interface TopSongsResponse {
    code: number;
    data: Song[];
}

export interface Song {
    starred: boolean;
    popularity: number;
    starredNum: number;
    playedNum: number;
    dayPlays: number;
    hearTime: number;
    albumData: null;
    mp3Url: string;
    rtUrls: null;
    privilege: Privilege;
    videoInfo: null;
    relatedVideo: null;
    st: number;
    exclusive: boolean;
    alias: any[];
    album: Album;
    fee: number;
    mvid: number;
    commentThreadId: string;
    artists: Artist[];
    hMusic: HMusic;
    mMusic: HMusic;
    lMusic: HMusic;
    score: number;
    copyFrom: string;
    disc: string;
    no: number;
    ringtone: string;
    audition: null;
    crbt: null;
    bMusic: HMusic;
    rtUrl: null;
    ftype: number;
    rtype: number;
    rurl: null;
    copyrightId: number;
    duration: number;
    status: number;
    position: number;
    name: string;
    id: number;
}

interface HMusic {
    volumeDelta: number;
    playTime: number;
    bitrate: number;
    dfsId: number;
    sr: number;
    name: null;
    id: number;
    size: number;
    extension: string;
}

interface Album {
    songs: null;
    paid: boolean;
    onSale: boolean;
    alias: any[];
    picUrl: string;
    picId: number;
    publishTime: number;
    commentThreadId: string;
    artists: Artist[];
    briefDesc: string;
    artist: Artist;
    company: string;
    copyrightId: number;
    subType: string;
    description: string;
    blurPicUrl: string;
    companyId: number;
    pic: number;
    status: number;
    tags: string;
    name: string;
    id: number;
    type: string;
    size: number;
    picId_str: string;
}

interface Artist {
    img1v1Id: number;
    topicPerson: number;
    alias: any[];
    followed: boolean;
    picUrl: string;
    picId: number;
    briefDesc: string;
    musicSize: number;
    albumSize: number;
    img1v1Url: string;
    trans: string;
    name: string;
    id: number;
    img1v1Id_str: string;
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
}