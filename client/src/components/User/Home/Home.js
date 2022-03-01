import React from 'react'

function Home() {
    return (
        <div className="container-fluid">
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg" className="d-block w-100" style={{ height: '400px' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/photos/renewable-energy-and-sustainable-development-picture-id1186330948?k=20&m=1186330948&s=612x612&w=0&h=5aNPCcQ8FcZraX44PEhb2mqcHkow2xMITJMHdh28xNg=" className="d-block w-100" style={{ height: '400px' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpaperaccess.com/full/4307746.jpg" className="d-block w-100" style={{ height: '400px' }} alt="..." />
                    </div>
                </div>
            </div>
            <div className="card my-4">
                <div className="card-body p-5">
                    <h3 className="text-center mb-4">Subscribe for news letter</h3>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-6 row">
                            <div className="col-md-8">
                                <input type="email" className="form-control" placeholder='Email'/>
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-primary ">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home