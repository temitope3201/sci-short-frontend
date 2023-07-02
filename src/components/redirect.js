import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '..';
import { Container } from 'react-bootstrap';

const RedirectURL = () => {
    const { short_url } = useParams();
    const [longLink, setLongLink] = useState("");

    useEffect(() => {
        fetch(`${baseUrl}/${short_url}`)
            .then(response => {
                console.log(response.status);
                return response.json()
            })
            .then(data => {
                console.log(data.data);
                console.log(data.message);
                setLongLink(data.data);
                window.location.replace(data.data);
                alert(data.message);
            })
            .catch((error) => {
                console.error('Error redirecting:', error);
            });
    }, [short_url]);

    return (
        <Container>
            <p>Redirecting in 3 secs to: {longLink}{" "}...</p>
            <p>If not redirected automatically, please <Link to={longLink}>click here</Link> to go to the link.</p>
        </Container>
    );
};

export default RedirectURL;