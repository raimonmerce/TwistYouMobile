import React, { useRef, useEffect, useState } from "react";
import { Animated, StyleSheet, ImageSourcePropType } from "react-native";
import { characterSprites } from "./characterSprites";
import { characterAnimations } from "./characterAnimations";

interface AnimatedCharacterProps {
  triggerKey: string | number;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({ triggerKey }) => {
  const animation = characterAnimations.spinIn;

  const positionY = useRef(new Animated.Value(animation?.initial.position.y ?? 0)).current;
  const positionX = useRef(new Animated.Value(animation?.initial.position.x ?? 0)).current;
  const scale = useRef(new Animated.Value(animation?.initial.scale ?? 1)).current;
  const rotation = useRef(new Animated.Value(animation?.initial.rotation ?? 0)).current;
  const opacity = useRef(new Animated.Value(animation?.initial.opacity ?? 1)).current;

  const colorKeys = Object.keys(characterSprites);
  const imageOptions = colorKeys.map(
    color => characterSprites[color].pose2
  );
  
  const [imageSource, setImageSource] = useState<ImageSourcePropType>(imageOptions[0]);

  const runAnimation = (from: typeof animation.initial, to: typeof animation.final, duration: number) => {
    positionY.setValue(from.position.y);
    positionX.setValue(from.position.x);
    scale.setValue(from.scale);
    rotation.setValue(from.rotation);
    opacity.setValue(from.opacity);

    Animated.parallel([
      Animated.timing(positionY, { toValue: to.position.y, duration, useNativeDriver: true }),
      Animated.timing(positionX, { toValue: to.position.x, duration, useNativeDriver: true }),
      Animated.timing(scale, { toValue: to.scale, duration, useNativeDriver: true }),
      Animated.timing(rotation, { toValue: to.rotation, duration, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: to.opacity, duration, useNativeDriver: true }),
    ]).start();
  };

  const animateOutThenIn = () => {
    if (!animation) return;
    const { initial, final, duration } = animation;

    Animated.parallel([
      Animated.timing(positionY, { toValue: initial.position.y, duration, useNativeDriver: true }),
      Animated.timing(positionX, { toValue: initial.position.x, duration, useNativeDriver: true }),
      Animated.timing(scale, { toValue: initial.scale, duration, useNativeDriver: true }),
      Animated.timing(rotation, { toValue: initial.rotation, duration, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: initial.opacity, duration, useNativeDriver: true }),
    ]).start(() => {
      setImageSource(prev => {
        let next;
        do {
          next = imageOptions[Math.floor(Math.random() * imageOptions.length)];
        } while (next === prev);
        return next;
      });
      runAnimation(initial, final, duration);
    });
  };

  useEffect(() => {
    if (animation) animateOutThenIn();
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
