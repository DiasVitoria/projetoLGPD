import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAlert from "../../../utils/alerts";
import './userStyles.css'
import { InputFieldComponent } from "../../components/inputField/inputFieldComponent";
import userController from "../../../services/controllers/userController";

import { AuthContext } from "../../../contexts/auth-context";


export const EditConfirm = () => {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const alert = useAlert();

  if (!location.state){
    navigate('/home')
    return <></>
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      password == null ||
      password === "" ||
      password === " "
    ) {
      alert.criarAlerta({
        title: "Opss...",
        html: "Senha inválidos.",
      });
      return;
    }
    const response = await userController.update(location.state.data, location.state._id)
    console.log(response) 
    if (!response.error) {
      updateUser(location.state)
    }

  };


  return (

    <div className='loginContainer'>
      <div className='loginForm'>
        <InputFieldComponent
          label="Senha"
          htmlFor="senha"
          idContainer="loginSenha"
          value={password}
          type="password"
          onChange={(e) => {setPassword(e)}}
          id="senha"
          name="password"
        />
        <div className='loginButtonContainer'>
          <button onClick={() => navigate('/userEdit')} type="submit" className='button cancelButton'>
            Voltar
          </button>
          <button onClick={handleSubmit} type="submit" className='button loginButton'>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditConfirm;
