# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockfirme',
            name='total',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
