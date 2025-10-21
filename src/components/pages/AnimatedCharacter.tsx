import React, { useRef, useEffect, useState } from "react";
import { Animated, StyleSheet, Dimensions, ImageSourcePropType } from "react-native";

// Import your four color images
import yellowImage from "../../assets/png/concepts/yellow_1.png";
import redImage from "../../assets/png/concepts/red_1.png";
import greenImage from "../../assets/png/concepts/green_1.png";
import blueImage from "../../assets/png/concepts/blue_1.png";

interface AnimatedCharacterProps {
  triggerKey: string | number; // unique value to re-trigger animation (e.g. currentTask.text)
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({ triggerKey }) => {
  const screenHeight = Dimensions.get("window").height;

  const positionY = useRef(new Animated.Value(screenHeight * 0.3)).current;
  const positionX = useRef(new Animated.Value(-50)).current;
  const rotation = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const imageOptions: ImageSourcePropType[] = [yellowImage, redImage, greenImage, blueImage];
  const [imageSource, setImageSource] = useState<ImageSourcePropType>(imageOptions[0]);

  const animateIn = () => {
    positionY.setValue(screenHeight * 0.3);
    positionX.setValue(-50);
    rotation.setValue(30);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(positionY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(positionX, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // helper: start the "exit" animation, then switch image & enter
  const animateOutThenIn = () => {
    Animated.parallel([
      Animated.timing(positionY, {
        toValue: screenHeight * 0.3,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(positionX, {
        toValue: -50,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 30,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // after exit animation completes → pick new image & animate in
      setImageSource(prev => {
        let next;
        do {
          next = imageOptions[Math.floor(Math.random() * imageOptions.length)];
        } while (next === prev);
        return next;
      });
      animateIn();
    });
  };

	useEffect(() => {
		animateOutThenIn();
	}, [triggerKey]);

	const rotateInterpolate = rotation.interpolate({
		inputRange: [0, 360],
		outputRange: ["0deg", "360deg"],
	});

	return (
		<Animated.Image
			source={imageSource}
			style={[
				styles.image,
				{
					opacity,
					transform: [
							{ translateX: positionX },
							{ translateY: positionY },
							{ rotate: rotateInterpolate },
					],
				},
			]}
		/>
	);
};

const styles = StyleSheet.create({
  image: {
    width: 600,
    height: 600,
    resizeMode: "contain",
  },
});

export default AnimatedCharacter;
