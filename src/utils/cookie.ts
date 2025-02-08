// function to set the cookie
const setCookie = (cookieName: string, cookieValue: string, expiryDays: number) => {
  // const to store the current date
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + expiryDays * 24 * 60 * 60 * 1000);

  // const to store when cookie expires
  const expiresAt = 'expires=' + currentDate.toUTCString();

  // setting the cookie
  document.cookie = `${cookieName}=${cookieValue};${expiresAt};path=/`;
};

const generateUUID = () => {
  // storing the current user_id from cookie
  const userIdFromCookie = document.cookie.split('user_id=')[1];

  if (userIdFromCookie != undefined) {
    return userIdFromCookie;
  } else {
    // variable to store the current time
    let currentTime = new Date().getTime();
    // const to store the newly created uuid
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      // const to store the remainder
      const remainder = (currentTime + Math.random() * 16) % 16 | 0;
      currentTime = Math.floor(currentTime / 16);
      return (char == 'x' ? remainder : (remainder & 0x3) | 0x8).toString(16);
    });

    // calling function to set the cookie
    setCookie('user_id', uuid, 20 * 365);

    return uuid;
  }
};

export default generateUUID;
