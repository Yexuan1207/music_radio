export interface hotType {
    first: string,
    second: number,
    thrid: null,
    inconType: number,

}
export type SearchHot = {
    result: {
        hots: hotType[];
    };
};

//搜索建议
export interface RootObject {
    result: Result;
    code: number;
}

export interface Result {
    albums: Album[];
    artists: Artist[];
    songs: Song[];
    order: string[];
    playlists: Playlist[];
    mv: Mv[];
}
export interface Playlist {
    id: number;
    name: string;
    coverImgUrl: string;
    creator: null;
    subscribed: boolean;
    trackCount: number;
    userId: number;
    playCount: number;
    bookCount: number;
    specialType: number;
    officialTags: null;
    action: null;
    actionType: null;
    recommendText: null;
    score: null;
    officialPlaylistTitle: null;
    playlistType: string;
    description: string;
    highQuality: boolean;
}
export interface Song {
    id: number;
    name: string;
    artists: Artist2[];
    album: Album2;
    duration: number;
    copyrightId: number;
    status: number;
    alias: any[];
    rtype: number;
    ftype: number;
    mvid: number;
    fee: number;
    rUrl: null;
    mark: number;
}

interface Album2 {
    id: number;
    name: string;
    artist: Artist2;
    publishTime: number;
    size: number;
    copyrightId: number;
    status: number;
    picId: number;
    mark: number;
}

export interface Artist2 {
    id: number;
    name: string;
    // picUrl: null;
    alias: any[];
    // albumSize: number;
    // picId: number;
    // fansGroup: null;
    // img1v1Url: string;
    // img1v1: number;
    // trans: null;
}

interface Album {
    id: number;
    name: string;
    artist: Artist;
    publishTime: number;
    size: number;
    copyrightId: number;
    status: number;
    picId: number;
    mark: number;
}

interface Artist {
    id: number;
    name: string;
    picUrl: string;
    alias: any[];
    albumSize: number;
    picId: number;
    fansGroup: null;
    img1v1Url: string;
    img1v1: number;
    trans: null;
}

//mv

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
    alias: any[];
    transNames: null;
}