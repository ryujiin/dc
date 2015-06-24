# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0006_auto_20150529_1756'),
    ]

    operations = [
        migrations.AlterField(
            model_name='firme',
            name='modelo',
            field=models.CharField(blank=True, max_length=100, null=True, choices=[(b'scuff-01', b'Scuff 01'), (b'scuff-H-01', b'Scuff Hombre 01')]),
            preserve_default=True,
        ),
    ]
