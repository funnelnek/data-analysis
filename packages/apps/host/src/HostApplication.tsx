import { FC } from "react";
import { AppShell } from "./AppShell";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([]);

export const HostApplication: FC<any> = (props: any): JSX.Element => {
    return (
        <RouterProvider router={router} />
    );
}