import axios from "axios";
import Service from '../service';

export const authService = new Service('api/v1', 'auth');
export const userService = new Service('api/v1', 'users');
export const postService = new Service('api/v1', 'posts');
