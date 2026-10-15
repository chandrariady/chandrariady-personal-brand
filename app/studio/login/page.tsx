import {Suspense} from "react";import LoginForm from "@/components/studio/LoginForm";
export default function LoginPage(){return <div className="studio-login"><div className="studio-login-grid"/><Suspense><LoginForm/></Suspense></div>}
