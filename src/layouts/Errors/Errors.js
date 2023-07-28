function Errors404() {
    return ( <>
    <div className="error">
  <img src="./img/404.PNG" alt="" />
  <div className="error_content">
    <h1 className="text-7xl">Không tìm thấy trang</h1>
    <span className="text-xl">
      Oops! Hệ thống không tồn tại trang mà bạn tìm kiếm
    </span>
    <a href="/">
      <button className="btn secondary text-xl">Quay lại</button>
    </a>
  </div>
</div>
    </> );
}

export default Errors404;