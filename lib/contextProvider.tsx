"use client";
import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

const RecoilContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <RecoilRoot>{children}</RecoilRoot>
    )

};

export default RecoilContextProvider;
