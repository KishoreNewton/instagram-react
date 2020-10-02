async function handleImageUpload(image) {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
    data.append('cloud_name', process.env.REACT_APP_CLOUD_NAME)
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
        method: "POST",
        accep: "application/json",
        body: data
    })
    const jsonResponse = await response.json()
    return jsonResponse.url
}

export default handleImageUpload