import React, { useRef, useEffect, useState } from 'react';
import {
  makeStyles,
  Container,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  Link,
  Grid
 } from '@material-ui/core';
import QrScanner from 'qr-scanner';

const useStyles = makeStyles(theme => (
  {
    root: {
      margin: 'auto',
      maxHeight: '100vh',
      bottom: 0
    },
    video: {
      height: 12,
      maxWidth: '100%',
      objectFit: "cover"
    },
    card: {
      margin: 'auto',

      marginTop: theme.spacing(2)
    }
  }
))


function App() {
  const videoRef = useRef(null);
  const classes = useStyles();

  const [result, setResult] = useState(null);

  useEffect(() => {
    if (result) {
      return
    }
    const qrScanner = new QrScanner(videoRef.current, (result) => {
      setResult(result);
      qrScanner.stop()
    })

    qrScanner.start().catch(console.error);
    return () => {
      qrScanner.destroy();
    }

  }, [result])

  const handleOnScanAnother = () => {
    setResult(null)
  }

  const scanningView = (
    <div>
      <CardMedia>
        <video about='scanner' className={classes.video} ref={videoRef}></video>
      <CardContent>
        <Typography>Scanning QR codes...</Typography>
      </CardContent>
      </CardMedia>
    </div>
  )

  const resultView = (
    <div className={classes.root}>
      <CardContent>
        <Typography color='textPrimary'>Result:</Typography>
        <Grid container>
        <Grid item>
          <Card variant='outlined'>
            <CardContent>
              <Link href={result}>{result}</Link>
            </CardContent>
          </Card>
        </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={handleOnScanAnother}>Scan another</Button>
      </CardActions>
    </div>
  )

  return (
    <div>
      <Container maxWidth='md'>
        <Card className={classes.card}>
          <CardHeader title={document.title}>
          </CardHeader>
          {result ? resultView : scanningView}
        </Card>
      </Container>
    </div>
  );
}

export default App;
