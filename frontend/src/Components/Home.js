import React, { useContext } from 'react'
import './LandingSection.css'
import Card from './categoryCard'
import context from '../Context/Context'

function LandingSection(props) {

  var {categories} = useContext(context);

  return (
    <>
      <section className='landingSection'>
      </section>
      <section className='overlap'>
          <h1>Keep an eye on time</h1>
      </section>

      {/* Categories of watch we sell */}
      <div className='container my-3 text-center'>
        <h1>Shop by category</h1>
        <hr />

        <div className="row">
          {categories.map((singleCategory) => {
            return <Card key = {singleCategory._id} title = {singleCategory.categoryName} description = {singleCategory.description} img = {singleCategory.img}/>
          })}
        </div>
      </div>

    </>
  )
}

export default LandingSection