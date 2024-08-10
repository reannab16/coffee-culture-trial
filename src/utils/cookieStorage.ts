import Cookies from "js-cookie";

const cookieStorage = {
  getItem: (name: string) => {
    const item = Cookies.get(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    Cookies.set(name, JSON.stringify(value), { expires: 7 }); // Expires in 7 days
  },
  removeItem: (name: string) => {
    Cookies.remove(name);
  }
};

export {cookieStorage};