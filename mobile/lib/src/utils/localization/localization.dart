import 'dart:async';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'localization_en.dart';

class MyLocalizationsDelegate extends LocalizationsDelegate<Localization> {
  const MyLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => [
        'en',
      ].contains(locale.languageCode);
  @override
  Future<Localization> load(Locale locale) => _load(locale); 

  static Future<Localization> _load(Locale locale) async {
    final String? name =
        ((locale.countryCode == null || locale.countryCode!.isEmpty)
            ? locale.languageCode
            : locale) as String?;
    final localeName = Intl.canonicalizedLocale(name);
    Intl.defaultLocale = localeName;
    return LocalizationEN();
  }

  @override
  bool shouldReload(LocalizationsDelegate<Localization> old) => false;
}

abstract class Localization {
  static Localization? of(BuildContext context) {
    return Localizations.of<Localization>(context, Localization);
  }

  String get googleSignInLabel;
  String get facebookSignInLabel;
  String get twitterSignInLabel;
  String get appBarLabel;
}
