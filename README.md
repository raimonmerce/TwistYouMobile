
npx expo start
eas build -p android --profile preview
npx expo run:android
npx expo install expo-dev-client
npx expo prebuild

local.properties: sdk.dir=C:\\Users\\raimo\\AppData\\Local\\Android\\Sdk

//Generate build
./gradlew clean
./gradlew --stop
./gradlew assembleRelease
./gradlew bundleRelease

aab for playstore:
android/app/build/outputs/bundle/release/app-release.aab

apk local testing:
android/app/build/outputs/apk/release/app-release.apk

build.gradle:
    lint {
        disable 'Instantiatable'
        abortOnError false
    }