export type getSearchSongTyep = {
    result: {
        songCount: number,
        songs: Song[],
        [key: string]: any
    }
    [key: string]: any
}


export interface Song {
    album: Album;
    fee: number;
    duration: number;
    rtype: number;
    ftype: number;
    artists: Artist[];
    copyrightId: number;
    mvid: number;
    name: string;
    alias: string[];
    id: number;
    mark: number;
    status: number;
}

interface Album {
    publishTime: number;
    size: number;
    artist: Artist;
    copyrightId: number;
    name: string;
    id: number;
    picId: number;
    mark: number;
    status: number;
}

interface Artist {
    img1v1Url: string;
    img1v1: number;
    name: string;
    alias: any[];
    id: number;
    albumSize: number;
    picId: number;
}

//playlists
export type getSearchPlaylistType = {
    result: {
        playlists: Playlist[],
        playlistCount: number,
        [key: string]: any
    },
    [key: string]: any
}

export interface Playlist {
    id: number;
    name: string;
    coverImgUrl: string;
    creator: Creator;
    subscribed: boolean;
    trackCount: number;
    userId: number;
    playCount: number;
    bookCount: number;
    specialType: number;
    officialTags: null;
    action: string;
    actionType: string;
    recommendText: string;
    score: null;
    officialPlaylistTitle: null;
    playlistType: string;
    description: null;
    highQuality: boolean;
    track: Track;
    alg: string;
}

interface Track {
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
    ringtone: null;
    crbt: null;
    audition: null;
    copyFrom: string;
    commentThreadId: string;
    rtUrl: null;
    ftype: number;
    rtUrls: any[];
    copyright: number;
    hMusic: HMusic;
    mMusic: HMusic;
    lMusic: HMusic;
    mvid: number;
    rtype: number;
    rurl: null;
    bMusic: HMusic;
    mp3Url: null;
}

interface HMusic {
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
    idStr: null;
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
    onSale: boolean;
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

interface Creator {
    nickname: string;
    userId: number;
    userType: number;
    avatarUrl: string;
    authStatus: number;
    expertTags: null;
    experts: null;
}

//mv
export type getSearchMvType = {
    result: {
        mvs: Mv[],
        mvCount: number,
        [key: string]: any
    },
    [key: string]: any
}
export interface Mv {
    id: number;
    cover: string;
    name: string;
    playCount: number;
    briefDesc: null | string;
    desc: null;
    artistName: string;
    artistId: number;
    duration: number;
    mark: number;
    arTransName: string;
    artists: Artist[];
    transNames: null;
    alias: string[] | null;
    alg: string;
}

interface Artist {
    id: number;
    name: string;
    alias: any[];
    transNames: null;
}