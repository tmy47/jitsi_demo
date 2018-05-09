import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * The number of dots to display in AudioLevelIndicator.
 *
 * IMPORTANT: AudioLevelIndicator assumes that this is an odd number.
 */
const AUDIO_LEVEL_DOTS = 5;

/**
 * The index of the dot that is at the direct middle of all other dots.
 */
const CENTER_DOT_INDEX = Math.floor(AUDIO_LEVEL_DOTS / 2);

/**
 * Creates a ReactElement responsible for drawing audio levels.
 *
 * @extends {Component}
 */
class AudioLevelIndicator extends Component {
    /**
     * {@code AudioLevelIndicator}'s property types.
     *
     * @static
     */
    static propTypes = {
        /**
         * The current audio level to display. The value should be a number
         * between 0 and 1.
         *
         * @type {number}
         */
        audioLevel: PropTypes.number
    };

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        // First make sure we are sensitive enough.
        const audioLevel = Math.min(this.props.audioLevel * 1.2, 1);

        // Let's now stretch the audio level over the number of dots we have.
        const stretchedAudioLevel = AUDIO_LEVEL_DOTS * audioLevel;

        const audioLevelDots = [];

        for (let i = 0; i < AUDIO_LEVEL_DOTS; i++) {
            const distanceFromCenter = CENTER_DOT_INDEX - i;
            const audioLevelFromCenter
                = stretchedAudioLevel - Math.abs(distanceFromCenter);
            const cappedOpacity = Math.min(
                1, Math.max(0, audioLevelFromCenter));
            let className;

            if (distanceFromCenter === 0) {
                className = 'audiodot-middle';
            } else if (distanceFromCenter < 0) {
                className = 'audiodot-top';
            } else {
                className = 'audiodot-bottom';
            }

            audioLevelDots.push(
                <span
                    className = { className }
                    key = { i }
                    style = {{ opacity: cappedOpacity }} />
            );
        }

        return (
            <span className = 'audioindicator in-react'>
                { audioLevelDots }
            </span>
        );
    }
}

export default AudioLevelIndicator;
