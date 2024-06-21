import { useFormik } from "formik";
import styles from './SingIn.module.css'
import { Link } from "react-router-dom";
import { useAuthUserMutation } from "../../redux/user/userApi";
import Loading from "../Loading/Loading";


interface IErrors {
  email: string,
  password: string
}

function SingIn() {
  const [login, {isLoading, error}] = useAuthUserMutation()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit:
    // async (event) => {
    //
    //   await login({
    //     email: event.email,
    //     password: event.password
    //   });
    //
    //   if (error) {
    //     alert(error)
    //   } else {
    //     alert('Вы успешно авторизованы')
    //   }
    // }
      async (values) => alert(JSON.stringify(values, null, 2)),
    validate: (values): object => {
      const errors: IErrors = {
        email: '',
        password: ''
      };

      if (!values.email) {
        errors.email = 'Поле "e-mail" обязательно';
        console.log(errors.email)
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Некорректный адрес электронной почты';
      }
      if (!values.password) {
        errors.password = 'Поле "пароль" обязательно';
      }
      if (errors.email === '' && errors.password === '') {
        return {};
      } else {
        return errors;
      }
      // return errors;
    }
  });

  return (
    isLoading ? <Loading/> :
      <form className={styles.sing_in_form} onSubmit={formik.handleSubmit}>
        <p className={styles.form_title}>вход</p>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder={formik.touched.email && formik.errors.email ? formik.errors.email : 'e-mail'}
          className={formik.touched.email && formik.errors.email ? styles.sing_in_form_inputs_incorrect : styles.sing_in_form_inputs}
        />
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={formik.touched.password && formik.errors.password ? formik.errors.password : 'пароль'}
          className={formik.touched.password && formik.errors.password ? styles.sing_in_form_inputs_incorrect : styles.sing_in_form_inputs}
        />
        <button type="submit" className={styles.sing_in_form_button}>войти</button>
        <Link to={"/register"}><p>нет профиля,зарегистрироваться</p></Link>
      </form>
  );
}

export default SingIn;