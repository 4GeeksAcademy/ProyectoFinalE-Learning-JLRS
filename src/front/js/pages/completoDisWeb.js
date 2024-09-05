
import "../../styles/completoDisWeb.css";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

function CompletoDisWeb() {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        
        const timer = setTimeout(() => {
            navigate("/vistaAlumno");
        }, 2000); // Redirige automáticamente después de 2 segundos (2000 ms)

        //reinicia o limpiar para evitar posibles problemas 
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="containerDisWeb mt-5">
            <h1>¡Gracias por tu compra!</h1>
            <p>En unos segundos volverás a tu espacio de trabajo {store.user?.alumno?.name}.</p>
            {/* Aquí puedes añadir más detalles sobre el curso contratado */}
        </div>
    );
}

export default CompletoDisWeb;
