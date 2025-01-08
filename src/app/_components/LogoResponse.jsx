'use client';

import { useEffect } from "react";

import pages_data from "../_data/pages_data";
import HeadingDescComponent from "./HeadingDescComponent";


const LogoResponse = ({ allFormData }) => {


  useEffect(() => {

    if (typeof window !== undefined && allFormData?.logotitle && allFormData?.logodescription && allFormData?.logocolorpalette && allFormData?.logodesign && allFormData?.logoidea) {

      localStorage.setItem('allFormData', JSON.stringify(allFormData));

    }

  }, [allFormData]);

  
  return (
    <div className="my-5">

        <HeadingDescComponent title={pages_data.ResultTitle} description={pages_data.ResultDescription} />

        <div className="mt-3 flex flex-col gap-2 text-sm lg:text-lg">

          <p className="p-2 bg-rose-50 rounded-xl">Logo Title: <span className="font-semibold text-primary">{allFormData?.logotitle ? allFormData?.logotitle : 'Not Available'}</span> </p>

          <p className="p-2 bg-rose-50 rounded-xl">Logo Description: <span className="font-semibold text-primary">{allFormData?.logodescription ? allFormData?.logodescription : 'Not Available'}</span> </p>

          <p className="p-2 bg-rose-50 rounded-xl">Logo Color Palette: <span className="font-semibold text-primary">{allFormData?.logocolorpalette ? allFormData?.logocolorpalette : 'Not Available'}</span> </p>

          <p className="p-2 bg-rose-50 rounded-xl">Logo Design: <span className="font-semibold text-primary">{allFormData?.logodesign?.title ? allFormData?.logodesign?.title : 'Not Available'}</span> </p>

          <p className="p-2 bg-rose-50 rounded-xl">Logo Idea: <span className="font-semibold text-primary">{allFormData?.logoidea ? allFormData?.logoidea : 'Not Available'}</span> </p>

        </div>

    </div>
  )
}

export default LogoResponse;