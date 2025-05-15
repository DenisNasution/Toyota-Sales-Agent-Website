import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found-Recipe of World";
  }, []);
  return (
    <main className='headerMain'>
      <section className='vehiclePage'>
        <div className='spinLoader' style={{ textAlign: "center" }}>
          {/* <div className='mainContainerCenter'> */}
          <h1>Halaman Tidak Ditemukan</h1>
          <Link to={"/"}>Kembali ke Beranda</Link>
          {/* </div> */}
        </div>
      </section>
    </main>
  );
};

export default NotFound;
