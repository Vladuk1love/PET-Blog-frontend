import { useFormik } from "formik";
import styles from './SingUp.module.css'
import { Link } from "react-router-dom";


interface IErrors {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  checkbox: string,
}

function SingUp() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      checkbox: false
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    validate: (values) => {
      const errors: IErrors = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        checkbox: ''
      };
      if (!values.name) {
        errors.name = 'Поле "имя" обязательно';
      }
      if (!values.email) {
        errors.email = 'Поле "e-mail" обязательно';
      }
      if (!values.password) {
        errors.password = 'Поле "пароль" обязательно';
      } else if (values.password.length < 6) {
        errors.password = "Минимум 6 символов в пароле";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Повторите пароль";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Пароли не совпадают";
      }
      if (!values.checkbox) {
        errors.checkbox = 'обязательное поле'
      }
      if (errors.name === '' &&
        errors.email === '' &&
        errors.password === '' &&
        errors.confirmPassword === '' &&
        errors.checkbox === '') {
        return {};
      } else {
        return errors;
      }
    }
  });


  return (
    <form className={styles.sing_up_form} onSubmit={formik.handleSubmit}>
      <p className={styles.form_title}>регистрация</p>
      <input
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        placeholder={formik.touched.name && formik.errors.name ? formik.errors.name : 'имя'}
        className={formik.touched.name && formik.errors.name ? styles.sing_up_form_inputs_incorrect : styles.sing_up_form_inputs}
      />
      <input
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder={formik.touched.email && formik.errors.email ? formik.errors.email : 'e-mail'}
        className={formik.touched.email && formik.errors.email ? styles.sing_up_form_inputs_incorrect : styles.sing_up_form_inputs}

      />
      <input
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder={formik.touched.password && formik.errors.password ? formik.errors.password : 'пароль'}
        className={formik.touched.password && formik.errors.password ? styles.sing_up_form_inputs_incorrect : styles.sing_up_form_inputs}

      />
      <input
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        placeholder={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : 'повторите пароль'}
        className={formik.touched.confirmPassword && formik.errors.confirmPassword ? styles.sing_up_form_inputs_incorrect : styles.sing_up_form_inputs}
      />
      <label
        className={formik.touched.checkbox && formik.errors.checkbox ? styles.sing_up_form_checkbox_incorrect : styles.sing_up_form_checkbox}
      >
        <input
          name="checkbox"
          type="checkbox"
          onChange={formik.handleChange}
          className={styles.sing_up_form_radio_input}
        />
        согласие на обработку персональных данных
      </label>

      <button type="submit" className={styles.sing_up_form_button}>войти</button>
      <Link to={"/login"}><p>уже зарегистрирован</p></Link>
    </form>
  );
}

export default SingUp;