export interface Profile {
  singer: {
    singerName: null | string;
    country: null | string;
    genre: null | string;
    isFilledIn: boolean,
  };
  movie: {
    movieName: null | string;
    country: null | string;
    genre: null | string;
    isFilledIn: boolean,
  };
  cartoon: {
    cartoonName: null | string;
    country: null | string;
    genre: null | string;
    isFilledIn: boolean,
  };
  userImage: {
    image: null | string,
    isFilledIn: boolean,
  },
}

export interface UserProfile {
  id: string;
  isAuth: boolean;
  profile: Profile;
}
