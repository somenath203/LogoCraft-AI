const HeadingDescComponent = ({ title, description }) => {
  return (
    <div>

      <h2 className="font-bold text-2xl lg:text-3xl text-primary text-center lg:text-left">{title}</h2>

      <p className="text-base lg:text-lg text-gray-500 text-center lg:text-left">{description}</p>

    </div>
  )
}

export default HeadingDescComponent;