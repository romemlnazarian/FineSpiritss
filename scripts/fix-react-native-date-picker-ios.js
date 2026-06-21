const fs = require('fs');
const path = require('path');

const root = process.cwd();

const fileReplacements = [
  {
    relativePath: 'node_modules/react-native-date-picker/ios/DatePicker.m',
    replacements: [
      ['#import "RCTComponent.h"', '#import <React/RCTComponent.h>'],
      ['#import "RCTUtils.h"', '#import <React/RCTUtils.h>'],
      ['#import "UIView+React.h"', '#import <React/UIView+React.h>'],
      ['#import "RCTConvert.h"', '#import <React/RCTConvert.h>'],
      ['#import "RCTView.h"', '#import <React/RCTView.h>'],
    ],
  },
  {
    relativePath: 'node_modules/react-native-date-picker/ios/RNDatePicker.mm',
    replacements: [
      ['#import "RCTConvert.h"', '#import <React/RCTConvert.h>'],
      ['#import "RCTUtils.h"', '#import <React/RCTUtils.h>'],
      ['#import "UIView+React.h"', '#import <React/UIView+React.h>'],
      ['#import "RCTComponent.h"', '#import <React/RCTComponent.h>'],
    ],
  },
  {
    relativePath: 'node_modules/react-native-date-picker/ios/RNDatePickerManager.mm',
    replacements: [
      ['#import "RCTConvert.h"', '#import <React/RCTConvert.h>'],
    ],
  },
  {
    relativePath:
      'node_modules/@react-native-firebase/messaging/ios/RNFBMessaging/RNFBMessagingModule.m',
    replacements: [
      ['dispatch_async(dispatch_async(dispatch_get_main_queue(), ^{', 'dispatch_async(dispatch_get_main_queue(), ^{'],
      ['dispatch_time(DISPATCH_TIME_NOW, 10.0 * NSEC_PER_SEC), dispatch_async(dispatch_get_main_queue(), ^{', 'dispatch_time(DISPATCH_TIME_NOW, 10.0 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{'],
      ['RCT_EXPORT_METHOD(completeNotificationProcessing) {\n  dispatch_get_main_queue(), ^{', 'RCT_EXPORT_METHOD(completeNotificationProcessing) {\n  dispatch_async(dispatch_get_main_queue(), ^{'],
      ['// messages, so we register directly now - see #7272\n                            dispatch_get_main_queue(), ^{', '// messages, so we register directly now - see #7272\n                            dispatch_async(dispatch_get_main_queue(), ^{'],
      ['// regardless of current status\n  dispatch_get_main_queue(), ^{', '// regardless of current status\n  dispatch_async(dispatch_get_main_queue(), ^{'],
      ['  };\n}', '  });\n}'],
    ],
  },
  {
    relativePath:
      'node_modules/@react-native-firebase/messaging/ios/RNFBMessaging/RNFBMessaging+AppDelegate.m',
    replacements: [
      ['dispatch_async(dispatch_async(dispatch_get_main_queue(), ^{', 'dispatch_async(dispatch_get_main_queue(), ^{'],
      ['dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(25 * NSEC_PER_SEC)),\n                     dispatch_async(dispatch_get_main_queue(), ^{', 'dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(25 * NSEC_PER_SEC)),\n                     dispatch_get_main_queue(), ^{'],
      ['sharedInstance.backgroundTaskId = [application beginBackgroundTaskWithExpirationHandler:^{\n        dispatch_get_main_queue(), ^{', 'sharedInstance.backgroundTaskId = [application beginBackgroundTaskWithExpirationHandler:^{\n        dispatch_async(dispatch_get_main_queue(), ^{'],
      ['// for immediate delivery\n          dispatch_get_main_queue(), ^{', '// for immediate delivery\n          dispatch_async(dispatch_get_main_queue(), ^{'],
      ['while (!sharedInstance.backgroundMessageHandlerSet) {\n                DLog(@"didReceiveRemoteNotification waiting for "\n                     @"sharedInstance.backgroundMessageHandlerSet %@",\n                     sharedInstance.backgroundMessageHandlerSet ? @"YES" : @"NO");\n                if (![sharedInstance.conditionBackgroundMessageHandlerSet\n                        waitUntilDate:[NSDate dateWithTimeIntervalSinceNow:25]]) {\n                  // If after 25 seconds the client hasn\'t called backgroundMessageHandlerSet, give\n                  // up on this notification\n                  ELog(@"didReceiveRemoteNotification timed out waiting for "\n                       @"sharedInstance.backgroundMessageHandlerSet");\n                  return;\n                }\n              }\n              dispatch_get_main_queue(), ^{', 'while (!sharedInstance.backgroundMessageHandlerSet) {\n                DLog(@"didReceiveRemoteNotification waiting for "\n                     @"sharedInstance.backgroundMessageHandlerSet %@",\n                     sharedInstance.backgroundMessageHandlerSet ? @"YES" : @"NO");\n                if (![sharedInstance.conditionBackgroundMessageHandlerSet\n                        waitUntilDate:[NSDate dateWithTimeIntervalSinceNow:25]]) {\n                  // If after 25 seconds the client hasn\'t called backgroundMessageHandlerSet, give\n                  // up on this notification\n                  ELog(@"didReceiveRemoteNotification timed out waiting for "\n                       @"sharedInstance.backgroundMessageHandlerSet");\n                  return;\n                }\n              }\n              dispatch_async(dispatch_get_main_queue(), ^{'],
    ],
  },
];

const fileTransforms = [
  {
    relativePath:
      'node_modules/@react-native-firebase/messaging/ios/RNFBMessaging/RNFBMessaging+AppDelegate.h',
    transform(original) {
      let next = original.replace('#import <React/RCTBridgeModule.h>\n', '');
      next = next.replace(
        /typedef void \(\^RCTPromiseResolveBlock\)\(id _Nullable result\);\ntypedef void \(\^RCTPromiseRejectBlock\)\(NSString \*code, NSString \*message, NSError \*error\);\n/g,
        '',
      );

      const marker = '#import <UIKit/UIKit.h>\n';
      const typedefs =
        '#import <UIKit/UIKit.h>\n\n' +
        'typedef void (^RCTPromiseResolveBlock)(id _Nullable result);\n' +
        'typedef void (^RCTPromiseRejectBlock)(NSString *code, NSString *message, NSError *error);\n';

      if (next.includes(marker) && !next.includes('typedef void (^RCTPromiseResolveBlock)')) {
        next = next.replace(marker, typedefs);
      }

      next = next.replace(
        'typedef void (^RCTPromiseRejectBlock)(NSString *code, NSString *message, NSError *error);\n\n\nNS_ASSUME_NONNULL_BEGIN',
        'typedef void (^RCTPromiseRejectBlock)(NSString *code, NSString *message, NSError *error);\n\nNS_ASSUME_NONNULL_BEGIN',
      );

      return next;
    },
  },
];

let updatedFiles = 0;

for (const {relativePath, replacements} of fileReplacements) {
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    continue;
  }

  const original = fs.readFileSync(absolutePath, 'utf8');
  let next = original;

  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }

  if (next !== original) {
    fs.writeFileSync(absolutePath, next);
    updatedFiles += 1;
  }
}

for (const {relativePath, transform} of fileTransforms) {
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    continue;
  }

  const original = fs.readFileSync(absolutePath, 'utf8');
  const next = transform(original);

  if (next !== original) {
    fs.writeFileSync(absolutePath, next);
    updatedFiles += 1;
  }
}

if (updatedFiles > 0) {
  console.log(`Patched iOS dependency sources in ${updatedFiles} file(s).`);
} else {
  console.log('iOS dependency patch already applied or package not installed.');
}
