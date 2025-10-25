import React, { useRef, useEffect, useState } from "react";
import { Animated, StyleSheet, ImageSourcePropType } from "react-native";
import { assets } from '../../assets/assets';
import { characterAnimations } from "./characterAnimations";
import { CharacterImageAnimation, Task } from "../../types";

interface AnimatedCharacterProps {
  newTask: Task;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({ newTask }) => {
  const [animation, setAnimation] = useState<CharacterImageAnimation>(
    characterAnimations.bottomRight
  );
  const positionY = useRef(new Animated.Value(animation?.initial.position.y ?? 0)).current;
  const positionX = useRef(new Animated.Value(animation?.initial.position.x ?? 0)).current;
  const scale = useRef(new Animated.Value(animation?.initial.scale ?? 1)).current;
  const rotation = useRef(new Animated.Value(animation?.initial.rotation ?? 0)).current;
  const opacity = useRef(new Animated.Value(animation?.initial.opacity ?? 1)).current;

  const colorKeys = ["yellow", "red", "green", "blue"] as const;
  
  const getImageSourceForKey = (key: string): ImageSourcePropType  => {
    const index = Math.floor(Math.random() * colorKeys.length)
    const color = colorKeys[index];

    const sprites = assets.png.characters[color];
    const text = key.toLowerCase();

    if (text.includes("alcohol") || text.includes("drink")) {
      return sprites.drunk;
    } else if (text.includes("extreme")) {
      return sprites.extreme;
    } else {
      const poses = [sprites.pose1, sprites.pose2];
      const poseIndex = Math.floor(Math.random() * poses.length);
      return poses[poseIndex];
    }
  };
  
  const [imageSource, setImageSource] = useState<ImageSourcePropType>(getImageSourceForKey(newTask.type));

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
    const { initial, duration } = animation;

    Animated.parallel([
      Animated.timing(positionY, { toValue: initial.position.y, duration, useNativeDriver: true }),
      Animated.timing(positionX, { toValue: initial.position.x, duration, useNativeDriver: true }),
      Animated.timing(scale, { toValue: initial.scale, duration, useNativeDriver: true }),
      Animated.timing(rotation, { toValue: initial.rotation, duration, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: initial.opacity, duration, useNativeDriver: true }),
    ]).start(() => {
      const newImage = getImageSourceForKey(newTask.type);
      setImageSource(newImage);
      const animationKeys = Object.keys(characterAnimations);
      const nextAnimationKey = animationKeys[Math.floor(Math.random() * animationKeys.length)];
      const nextAnimation = characterAnimations[nextAnimationKey];
      setAnimation(nextAnimation);
      positionY.setValue(nextAnimation.initial.position.y);
      positionX.setValue(nextAnimation.initial.position.x);
      scale.setValue(nextAnimation.initial.scale);
      rotation.setValue(nextAnimation.initial.rotation);
      opacity.setValue(nextAnimation.initial.opacity);
      runAnimation(nextAnimation.initial, nextAnimation.final, duration);
    });
  };

  useEffect(() => {
    if (animation) animateOutThenIn();
  }, [newTask]);

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
              { scale: scale }
          ],
        },
      ]}
    />
	);
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: 600,
    height: 600,
    resizeMode: "contain",
  },
});

export default AnimatedCharacter;
