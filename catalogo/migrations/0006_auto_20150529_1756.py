# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0005_firme'),
    ]

    operations = [
        migrations.AlterField(
            model_name='firme',
            name='modelo',
            field=models.CharField(blank=True, max_length=100, null=True, choices=[(b'scuff-01', b'Scuff 01'), (b'otro', b'Otro')]),
            preserve_default=True,
        ),
    ]
