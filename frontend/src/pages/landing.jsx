import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="landingPageContainer d-flex flex-column min-vh-100 text-light">
      {/* Navbar */}
      <nav className="navbar navbar-dark py-3 px-4">
        <h2 className="navbar-brand fw-bold text-warning m-0">
          Next_Video_Meet
        </h2>
      </nav>

      {/* Floating Side Buttons */}
      <div className="floatingSideButtons">
        <button className="side-btn" onClick={() => router("/auth")}>
          Register
        </button>
        <button className="side-btn" onClick={() => router("/auth")}>
          Login
        </button>
      </div>

      {/* Hero Section */}
      <div className="container my-auto py-5 text-center text-lg-start">
        <div className="row align-items-center g-4">
          {/* Text Section */}
          <div className="col-lg-6 col-md-12">
            <h1 className="fw-bold display-6 mb-3">
              <span className="text-warning">Connect</span> with your loved ones
            </h1>
            <p className="lead text-light-50 mb-4">
              Bring people closer — wherever they are. Fast, secure, and simple
              video calls with <strong>Next_Video_Meet</strong>.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
              <Link
                to="/auth"
                className="btn btn-warning btn-lg fw-semibold rounded-pill shadow"
              >
                Get Started
              </Link>
              <button
                onClick={() => router("/Guest")}
                className="btn btn-outline-light btn-lg fw-semibold rounded-pill"
              >
                Try as Guest
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 col-md-12 text-center position-relative">
            <img
              src="/mobile (1).png"
              alt="App Preview"
              className="img-fluid hero-img mt-4 mt-lg-0"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 text-secondary small mt-auto">
        © {new Date().getFullYear()} Next_Video_Meet — Stay Connected
      </footer>
    </div>
  );
}
