"use client"; // Client Component
import React from "react";
import Head from "next/head";
import Image from "next/image";
import "./page.module.css";
import "./underline.css";
import "./bg.css";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>EduMeter | Rate To Elevate </title>
      </Head>
      <main>
        <section className="hero-section min-h-100vh flex flex-col">
          <nav className="w-100pc flex flex-column md-flex-row md-px-10 py-5 bg-transparent">
            <div className="flex justify-between">
              <a href="#" className="flex items-center p-2 mr-4 no-underline">
                <div className="flex justify-between">
                  <Image src="/logo.png" width={400} height={300} />
                </div>
              </a>
              <a
                data-toggle="toggle-nav"
                data-target="#nav-items"
                href="#"
                className="flex items-center ml-auto md-hidden indigo-lighter opacity-50 hover-opacity-100 ease-300 p-1 m-3"
              >
                <i data-feather="menu" />
              </a>
            </div>
            <div
              id="nav-items"
              className="hidden flex sm-w-100pc flex-column md-flex md-flex-row md-justify-end items-center"
            >
              <a
                href="/sign-up"
                className="button bg-white black fw-600 no-underline mx-5"
                style={{ padding: "25px 50px", fontSize: 18, borderRadius: 8 }}
              >
                Sign-Up
              </a>
              <a
                href="/sign-in"
                className="button bg-indigo black fw-600 no-underline mx-5"
                style={{ padding: "25px 50px", fontSize: 18, borderRadius: 8 }}
              >
                Sign-in
              </a>
            </div>
          </nav>
          {/* hero section */}
          <div className="flex-grow items-center pb-30 justify-center">
            <div className="mx-5 md-mx-l5">
              <div>
                <h1 className="white fs-l3 lh-2 md-fs-xl1 md-lh-1 fw-900">
                  Transforming Education, <br />
                  One Rating at a Time
                </h1>
                <div
                  className="br-8 mt-10 inline-flex justify-center items-center"
                  style={{ textAlign: "center" }}
                >
                  <a
                    className="button bg-white black fw-500 no-underline mx-5"
                    href = "/sign-up"
                    style={{
                      borderRadius: 50,
                      padding: "30px 60px",
                      fontSize: 20,
                    }}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* big text */}
        <section className="p-10 md-py-10" style={{ backgroundColor: "black" }}>
          <div className="w-100pc md-w-70pc mx-auto py-10">
            <h2 className="white fs-l2 md-fs-xl1 fw-900 lh-2">
              Discover, Rate and{" "}
              <span className="text-underline"> Empower</span> Excellence in
              Education
            </h2>
          </div>
        </section>
        {/* blog */}
        <section className="p-0 md-p-5" style={{ backgroundColor: "black" }}>
          <div className="flex flex-wrap">
            <div className="w-100pc md-w-33pc p-10">
              <a className="block no-underline p-5 br-8 hover-bg-indigo-lightest-10 hover-scale-up-1 ease-300">
                <Image
                  className="w-100pc"
                  src="/image1.jpg"
                  alt=""
                  width={485}
                  height={485}
                />
                <p className="fw-600 white fs-m3 mt-3">
                  Real-Time Ratings and Reviews
                </p>
              </a>
            </div>
            <div className="w-100pc md-w-33pc p-10">
              <a className="block no-underline p-5 br-8 hover-bg-indigo-lightest-10 hover-scale-up-1 ease-300">
                <Image
                  className="w-100pc"
                  src="/image2.jpg"
                  alt=""
                  width={485}
                  height={485}
                />
                <p className="fw-600 white fs-m3 mt-3">
                  Personalized Recommendations
                </p>
              </a>
            </div>
            <div className="w-100pc md-w-33pc p-10">
              <a className="block no-underline p-5 br-8 hover-bg-indigo-lightest-10 hover-scale-up-1 ease-300">
                <Image
                  className="w-100pc"
                  src="/image3.jpg"
                  alt=""
                  width={485}
                  height={485}
                />
                <p className="fw-600 white fs-m3 mt-3">
                  Comprehensive Professor Profiles
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
