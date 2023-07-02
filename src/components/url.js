import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { domain } from '..';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faRefresh, faEdit, faChartBar, faRemove, faQrcode, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';




export const URL = ({id, title, description ,true_url, short_url, date_created, no_of_clicks, onRetrieve }) => {
    return (
        <div className="mb-3 box border rounded p-2" >
            <Card className='card'>
                <Link className="link" onClick={onRetrieve}>
                    <Card.Body>
                        <Card.Title>{title ? title : true_url}</Card.Title>
                        <Card.Link className='link'>{domain}/{short_url}</Card.Link>
                        <Card.Text className="m-2 text-muted">
                            <small className="justify-content">Date: {date_created}  ||  Clicks: {no_of_clicks}</small>
                        </Card.Text>
                        <Card.Text className='m-2 text-muted'> Id = {id} </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </div>
    )
};

export const URLDetails = ({ id, title, true_url, short_url, qrcodescans ,date_created, no_of_clicks, qr_code_uuid, onUpdate, onDelete, onReset, onGenerateQR, onCopy, qr_created, qr_image_url }) => {

    const imagePath = qr_image_url
    const imageName = `${qr_code_uuid}.png`
    
    

    const downloadImage = (imagePath, imageName) => {
        const link = document.createElement("a");
        link.href = imagePath;
        link.download = imageName;
        link.click();
    };

    return (
        <div className="mb-3 box border rounded p-2">
            <Card className='card p-4'>
                <div className="m-3">
                    <Button className="btn btn-sm m-2" variant="success" onClick={onUpdate} ><FontAwesomeIcon icon={faEdit} />{" "}Edit</Button>
                    <Button className="btn btn-sm m-2" variant="secondary" onClick={onReset} ><FontAwesomeIcon icon={faRefresh} />{" "}Reset</Button>
                    <Button className="btn btn-sm m-2" variant="danger" onClick={onDelete} ><FontAwesomeIcon icon={faTrash} />{" "}Delete</Button>
                    
                </div>
                <h3><b>Title: </b>{title ? title : "No Title"}</h3>
                <h5><b>Long URL: </b> {true_url}</h5>
                <div>
                    <h5>
                        <b>Short URL: </b><Link to={`/${short_url}`} target="_blank" rel="noopener noreferrer">{domain}/{short_url}</Link>{" "}
                        <Button className="btn btn-sm m-1" variant="secondary" onClick={onCopy}>
                            <FontAwesomeIcon icon={faCopy} />
                            {" "}Copy
                        </Button>
                    </h5>
                </div>
                <h6><b>Date: </b>{date_created}</h6>
                <h6><b>Clicks: </b>{no_of_clicks}</h6>
                <h6><b>No of Qr Code Scans: </b> {qrcodescans} </h6>
                <h6><b>QR Code: </b>
                    {/* {qr_code_added ? "Yes" : "No"} */}
                    {!qr_created ?
                        <>
                            No{" "}
                            <Button className="btn btn-sm m-2" variant="success" onClick={onGenerateQR} ><FontAwesomeIcon icon={faQrcode} />{" "}Generate QR Code</Button>
                        </>
                        :
                        <>
                            Yes{" "}
                            <span> View QrCode Below</span>
                        </>
                    }
                </h6>
                {qr_created &&
                    <>
                        {/* <p>{qr_code_id}</p> */}
                        <Image src={imagePath} rounded fluid />
                        <Button className="btn btn-sm m-2" variant="secondary" onClick={() => downloadImage(imagePath, imageName)}>
                            <FontAwesomeIcon icon={faDownload} />{" "}Download QR Code
                        </Button>
                    </>
                }
                <div className="m-3">
                    <Button className="btn btn-sm m-2" variant="success" onClick={onUpdate} ><FontAwesomeIcon icon={faEdit} />{" "}Edit</Button>
                    {/* <Button className="btn btn-sm m-2" variant="secondary" onClick={onReset} ><FontAwesomeIcon icon={faRefresh} />{" "}Reset</Button> */}
                    <Button className="btn btn-sm m-2" variant="danger" onClick={onDelete} ><FontAwesomeIcon icon={faTrash} />{" "}Delete</Button>
                    {/* <Button className="btn btn-sm m-2" variant="success" href={`/analytics/${id}`} >
                        <FontAwesomeIcon icon={faChartBar} />{" "}Analytics
                    </Button> */}
                </div>
            </Card>
        </div>
    )
};


