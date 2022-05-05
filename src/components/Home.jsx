function Home({toggleStart}) {
    return ( 
        <div className="Home">
            <h1>Quizzical</h1>
            <p className="desc">Some description if needed</p>
            <button 
                className="btn-start"
                onClick={toggleStart}>
                Start quiz
            </button>
        </div>
     );
}

export default Home;