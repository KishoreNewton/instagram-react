import { v4 as uuid } from "uuid";

export const defaultUser = {
  id: uuid(),
  username: "username",
  name: "name",
  profile_image:
    "https://images.freeimages.com/images/large-previews/338/sunset-over-lake-2-1377767.jpg"
  // profile_image:
  // "https://instagram.com/static/images/anonymousUser.jpg/23e7b3b2a737.jpg"
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: "username",
    name: "name",
    profile_image:
      "https://images.freeimages.com/images/large-previews/338/sunset-over-lake-2-1377767.jpg"
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">This is some data over here</span>`,
  user: defaultUser,
  media:
    "https://images.freeimages.com/images/large-previews/338/sunset-over-lake-2-1377767.jpg",
  comments: [],
  created_at: "2020-02-28T03:08:14.522421+00:00"
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">This is some data over here</span>`,
    user: defaultUser,
    media:
      "https://cdn.pixabay.com/photo/2020/03/01/10/24/power-4892237_960_720.jpg",
    comments: [],
    created_at: "2020-02-28T03:08:14.522421+00:00"
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: "follow",
    user: defaultUser,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  },
  {
    id: uuid(),
    type: "like",
    user: defaultUser,
    post: defaultPost,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  }
];

export const defaultCurrentUser = {
  id: uuid(),
  username: "me",
  name: "myself",
  profile_image:
    "https://images.freeimages.com/images/large-previews/338/sunset-over-lake-2-1377767.jpg",
  website: "https://demo.someweb",
  email: "me@gmail.com",
  bio: "This is my bio",
  phone_number: "555-555-5555",
  posts: [],
  followers: [defaultUser],
  following: [defaultUser]
};
