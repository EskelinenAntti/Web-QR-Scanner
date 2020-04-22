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
  Grid,
  Grow
 } from '@material-ui/core';
import QrScanner from 'qr-scanner';

const useStyles = makeStyles(theme => (
  {
    root: {
      width: '100vw',
      height: '100vh',
      overflow: 'auto'
    },
    video: {
      width: '100vw',
      height: '100vh',
      objectFit: "cover",
      zIndex:0
    },
    scannerTitle: {
      zIndex: 1000,
      color: 'white',
      marginLeft: '15px',
      marginRight: '15px',
    },
    scannerTitleBackground: {
      position: "absolute",
      background: 'black',
      opacity: 0.5,
      borderRadius: '20px',
      zIndex: 9,
      left: 0,
      top: 0,
      margin: theme.spacing(2)
    },
    card: {
      position: 'absolute',
      zIndex: 9,
      left: 0,
      right: 0,
      top: 0,
      margin: theme.spacing(2)
    }
  }
))

function App() {
  const videoRef = useRef(null);
  const classes = useStyles();

  const [result, setResult] = useState(null);


  useEffect(() => {
    const qrScanner = new QrScanner(videoRef.current, (result) => {
      setResult(prev => prev ? prev : result)
    })

    qrScanner.start().catch(console.error);
    return () => {
      qrScanner.destroy();
    }

  }, [])

  const handleOnScanAnother = () => {
    setResult(null)
  }

  const scanningView = (
      <div className={classes.scannerTitleBackground}>
        <Typography variant='body1' className={classes.scannerTitle}>Scanning QR...</Typography>
      </div>
  )

  const resultView = (
    <Grow in>
      <Card className={classes.card}>
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
      </Card>
    </Grow>
  );

  return (
    <div className={classes.root}>
      <video about='scanner' className={classes.video} ref={videoRef}></video>
      {result ? resultView : scanningView}
    </div>
  );
}

export default App;
