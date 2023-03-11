import { SyntheticEvent } from "react";
import { User } from "../../models/user";
import { UserApiRepo } from "../../services/repository/users.api.repo";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../services/firebase/firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
let pictureName: string = "picture.png";
let urlUserPicture: string = "";

export function Register() {
  const repo = new UserApiRepo();

  const handleSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formRegister = ev.currentTarget;
    const fileUserPicture = (formRegister[4] as HTMLInputElement).files?.item(
      0
    );

    if (fileUserPicture) {
      const emailSplit = (formRegister[2] as HTMLFormElement).value.split("@");
      console.log(emailSplit);

      pictureName = `user_${emailSplit[0]}_${emailSplit[1]}`;
      const storageRef = ref(storage, pictureName);
      await uploadBytes(storageRef, fileUserPicture);
      urlUserPicture = await getDownloadURL(storageRef);
      pictureName = "";
    }

    const newUser: Partial<User> = {
      firstName: (formRegister[0] as HTMLFormElement).value,
      lastName: (formRegister[1] as HTMLFormElement).value,
      email: (formRegister[2] as HTMLFormElement).value,
      passwd: (formRegister[3] as HTMLFormElement).value,
      snapUrl: urlUserPicture,
    };

    repo.createUser({ ...newUser, enemies: [], friends: [] });
    formRegister.reset();

    urlUserPicture = "";
  };

  return (
    <form onSubmit={handleSubmit} className="formRegister">
      <div className="formRegister__firstName">
        <label>
          First Name
          <input type="text" name="firstName" required />
        </label>
      </div>
      <div className="formRegister__lastName">
        <label>
          Last Name
          <input type="text" name="lastName" required />
        </label>
      </div>
      <div className="formRegister__email">
        <label>
          email
          <input type="email" name="email" required />
        </label>
      </div>
      <div className="formRegister__password">
        <label>
          Password
          <input type="password" name="passwd" required />
        </label>
      </div>
      <div className="formRegister__picture">
        <label>
          Picture
          <input type="file" name="picture" required />
        </label>
      </div>
      <div className="formRegister__submitButton">
        <button type="submit">Register</button>
      </div>
    </form>
  );
}
