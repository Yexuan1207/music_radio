export interface simiMv {
    mvs: Mv[];
    code: number;
}

export interface Mv {
    id: number;
    cover: string;
    name: string;
    playCount: number;
    briefDesc: null;
    desc: null;
    artistName: string;
    artistId: number;
    duration: number;
    mark: number;
    artists: Artist[];
    alg: string;
}

interface Artist {
    id: number;
    name: string;
    alias: string[];
    transNames: null;
}

export interface mvDetail {
    loadingPic: string;
    bufferPic: string;
    loadingPicFS: string;
    bufferPicFS: string;
    subed: boolean;
    mp: Mp;
    data: Data;
    code: number;
}

export interface Data {
    id: number;
    name: string;
    artistId: number;
    artistName: string;
    briefDesc: string;
    desc: string;
    cover: string;
    coverId_str: string;
    coverId: number;
    playCount: number;
    subCount: number;
    shareCount: number;
    commentCount: number;
    duration: number;
    nType: number;
    publishTime: string;
    price: null;
    brs: Br[];
    artists: Artist[];
    commentThreadId: string;
    videoGroup: any[];
}

interface Artist {
    id: number;
    name: string;
    img1v1Url: null;
    followed: boolean;
}

interface Br {
    size: number;
    br: number;
    point: number;
}

interface Mp {
    id: number;
    fee: number;
    mvFee: number;
    payed: number;
    pl: number;
    dl: number;
    cp: number;
    sid: number;
    st: number;
    normal: boolean;
    unauthorized: boolean;
    msg: null;
}

//
export interface playInfo {
    code: number;
    data: playInfoData;
}

export interface playInfoData {
    id: number;
    url: string;
    r: number;
    size: number;
    md5: string;
    code: number;
    expi: number;
    fee: number;
    mvFee: number;
    st: number;
    promotionVo: null;
    msg: string;
}