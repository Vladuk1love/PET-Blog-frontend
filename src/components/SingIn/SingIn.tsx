import { useFormik } from "formik";
import styles from './SingIn.module.css'
import { Link, Navigate } from "react-router-dom";
import { useAuthUserMutation } from "../../redux/user/userApi";
import Loading from "../Loading/Loading";
import { useActions } from "../../hooks/useActions";


interface IErrors {
  email: string,
  password: string
}


function SingIn() {
  const { loginState } = useActions()
  const [checkAuthFunc, {isLoading, error,data}] = useAuthUserMutation()
  const formik = useFormik({
    initialValues: {
      email: 'tes1124122@test.ru',
      password: '123456'
    },
    onSubmit:
      async (values) => {
        await checkAuthFunc(values)
        if (error) {
          console.log(error)
        }
        if (data){
          const {token} = data
          localStorage.setItem("token", token);
          loginState(data);

        }
      },
    validate: (values): object => {
      const errors: IErrors = {
        email: '',
        password: ''
      };

      if (!values.email) {
        errors.email = 'Поле "e-mail" обязательно';
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
    }
  });

  if (localStorage.getItem('token')){
    return <Navigate to={'/posts'}/>
  }

  if (error){
    console.log(error)
  }
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