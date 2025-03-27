export function createUser(userData) {
  return new Promise(async (resolve) => {
    // const response = await fetch("http://localhost:8080/users", {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function checkUser(loginfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }
    } catch (err) {
      reject({ err });
    }
  });
}

// ---- FRONT END ----
// export function checkUser(loginfo) {
//   return new Promise(async (resolve, reject) => {
//     const email = loginfo.email;
//     const password = loginfo.password;
//     const response = await fetch("http://localhost:8080/users/?email=" + email);

//     const data = await response.json();

//     if (data.length) {
//       if (password === data[0].password) {
//         resolve({ data: data[0] });
//       } else {
//         reject({ message: "user not found" });
//       }
//     } else {
//       reject({ message: "user not found" });
//     }
//   });
// }

export function signOut() {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
