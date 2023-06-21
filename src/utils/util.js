import { toNumber } from 'lodash';
import * as moment from 'moment';
export const getVideoCover = async (file, seekTo = 0.0) => {
    return new Promise((resolve, reject) => {
        // load the file to a video player
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
            reject('error when loading video file', ex);
        });
        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener('loadedmetadata', () => {
            // seek to user defined timestamp (in seconds) if possible
            if (videoPlayer.duration < seekTo) {
                reject('video is too short.');
                return;
            }
            // delay seeking or else 'seeked' event won't fire on Safari
            setTimeout(() => {
                videoPlayer.currentTime = seekTo;
            }, 200);
            // extract video thumbnail once seeking is complete
            videoPlayer.addEventListener('seeked', () => {
                console.log('video is now paused at %ss.', seekTo);
                // define a canvas to have the same dimension as the video
                const canvas = document.createElement('canvas');
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;
                // draw the video frame to canvas
                const ctx = canvas.getContext('2d');
                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

                // return the canvas image as a blob
                ctx.canvas.toBlob((blob) => {
                    resolve(
                        new File([blob], `${file.name.split('.')[0]}.jpeg`, {
                            type: 'image/jpeg',
                        })
                    );
                });
            });
        });
    });
};
export const objToArray = (obj) => {
    var keys = Object.keys(obj);
    var arr = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        arr.push(obj[key]);
    }
    return arr;
};
export const formatNftName = (string) => {
    return string.toLowerCase().replace(/\s/g, '_').replace(/-/g, '_');
};

export const parseNumber = (string) => {
    if (!string) return 0;
    return parseFloat(string.replace(/,/g, ''));
};

export const findCertificate = (arrayA, arrayB) => {
    const commonElements = [];

    for (let i = 0; i < arrayB.length; i++) {
        arrayA.forEach((element) => {
            if (element?.data?.content?.type === arrayB[i]) {
                commonElements.push(element);
            }
        });
    }

    return commonElements;
};


export function canClaimVesting(inputTimeInMillis) {

    // Convert the current time and input time to seconds
    const nowInSeconds = moment().utc().unix();
    const inputTimeInSeconds = moment(toNumber(inputTimeInMillis)).utc().unix();


    // Compare the current time and the input time
    if (nowInSeconds >= inputTimeInSeconds) {
        return true;
    } else {
        return false;
    }
}


export const validateReferralCode = (referralCode, wallet) => {
    const remaining = referralCode.slice(2);
    return wallet.includes(remaining);
}