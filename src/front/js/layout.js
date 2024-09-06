import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import Perfil from "./pages/perfil";
import About from "./pages/about";
import Vistacurso from "./pages/vistacurso";
import Contacto from "./pages/contacto";
import verVideo from "./pages/verVideo"

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { Cloudinary } from "./component/cloudinary"; 

import { Login } from "./pages/login";
import { SignUp } from "./pages/signUp";
import Cursos from "./pages/cursos";
import VerVideo from "./pages/verVideo";
import VistaProfe from "./pages/vistaProfe"; // importar VistaProfe
import PrivateRoute from "./component/privadaProfe";
import PrivateRouteAlumno from "./component/privadaAlumno";
import VistaAlumno from "./pages/vistaAlumno";
import VistaPago from "./pages/vistaPago";
import VistaDetallada from "./pages/VistaDetallaDWeb"; // Curso Diseño Web con más info detallada
import CompletoDisWeb from "./pages/completoDisWeb"; //Curso Completo una vez, pagas




const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <>      
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Perfil />} path="/perfil" />
                        <Route element={<VerVideo />} path="/verVideo" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Contacto />} path="/contacto" />
                        <Route path="/curso/:id" element={<VistaDetallada />} />
                        <Route element={<VistaPago />} path="/vistaPago" />
                        <Route path="/completoDisWeb" element={<CompletoDisWeb/>}/>
                        {/* Protege la ruta VistaAlumno con PrivateRouteAlumno, si el store.autentificacion es true,  y store.usuarioPr?.is_teacher es true, puede accerder */}
                        {/*DESCOMENTAR<Route element={<PrivateRouteAlumno vista={VistaAlumno} />} path="/vistaAlumno" />*/}
                        {/* Protege la ruta VistaProfe con PrivateRoute, si el store.autentificacion es true,  y store.usuarioPr?.is_teacher es true, puede acceder */}
                        {/*DESCOMENTAR<Route element={<PrivateRoute vista={VistaProfe} />} path="/vistaProfe" />*/}
                        {/*ELIMINAR LINEA 54 Y 55 AL TERMINAR ESTA RAMA*/}
                        <Route element={<VistaAlumno />} path="/vistaAlumno" />
                        <Route element={<VistaProfe />} path="/vistaProfe" />
                        <Route element={<Vistacurso />} path="/vistacurso" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                        <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </>
    );
};
export default injectContext(Layout);